# Contrato de Integración de API REST para Backend Java / PL/pgSQL
**Proyecto:** Sentria AI - Plataforma Asistencial  
**Consumidor:** Frontend Next.js (App Router, TypeScript)  
**Proveedor:** Backend Java (Spring Boot / Jakarta EE) + PostgreSQL / PL/pgSQL  

---

## 1. Convenciones Globales

### 1.1. URLs y Cabeceras
* **URL Base de Desarrollo:** `http://localhost:8080` (definida en `.env.local` mediante `NEXT_PUBLIC_API_URL`).
* **Formato de Serialización JSON:** `camelCase` (comportamiento estándar de Jackson en Spring Boot).
* **Cabeceras estándar en peticiones:**
  ```http
  Accept: application/json
  Content-Type: application/json
  Authorization: Bearer <JWT_TOKEN>
  ```
  *(Nota: en subida de adjuntos `multipart/form-data`, el frontend no envía `Content-Type` explícito para que el navegador configure el `boundary` automáticamente).*

### 1.2. Respuestas de Error Estándar (Spring Boot / RFC 7807)
El cliente HTTP del frontend procesa indistintamente tanto el estándar **RFC 7807 (ProblemDetail)** como el formato estándar de error de Spring Boot:

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Número de documento ya registrado en el sistema.",
  "errors": [
    "El correo electrónico no tiene un formato válido"
  ],
  "timestamp": "2026-10-01T15:30:00Z"
}
```

---

## 2. Configuración Recomendada de CORS en Java (Spring Boot)

Para permitir la comunicación sin bloqueos desde el frontend (`http://localhost:3000`):

```java
package ai.sentria.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000", "https://sentria.ai"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept", "X-Requested-With"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
```

---

## 3. Matriz Exhaustiva de Endpoints

### 3.1. Autenticación y Perfil (`/api/auth` y `/api/patient`)

#### A. Registro de Paciente
* **Método:** `POST`
* **Ruta:** `/api/auth/register`
* **Requiere Auth:** No
* **Request DTO (Java Record):**
```java
public record PatientRegistrationInput(
    @NotBlank String fullName,
    @NotBlank String docType, // "DNI", "LC", "LE", "PAS"
    @NotBlank String docNumber,
    @NotBlank String phone,
    @Email @NotBlank String email,
    @NotBlank String password,
    @NotBlank String coverageProvider,
    String memberId,
    @NotNull Boolean acceptTerms
) {}
```
* **Response (201 Created / 200 OK):**
```json
{
  "success": true,
  "message": "Ficha clínica creada exitosamente para María Florencia Gómez",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "4b68e7b9-1d98-4c60-a292-1a42b938f321",
    "fullName": "María Florencia Gómez",
    "email": "florencia.gomez@sentria.ai",
    "docType": "DNI",
    "docNumber": "38.452.901",
    "phone": "+54 11 4892-1200",
    "coverageProvider": "OSDE 310",
    "memberId": "492-3849102-01"
  }
}
```

#### B. Inicio de Sesión
* **Método:** `POST`
* **Ruta:** `/api/auth/login`
* **Requiere Auth:** No
* **Request DTO:**
```java
public record PatientLoginInput(
    @Email @NotBlank String email,
    @NotBlank String password
) {}
```
* **Response (200 OK):**
```json
{
  "success": true,
  "message": "Autenticación correcta",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "4b68e7b9-1d98-4c60-a292-1a42b938f321",
    "fullName": "María Florencia Gómez",
    "email": "florencia.gomez@sentria.ai",
    "docNumber": "38.452.901",
    "coverageProvider": "OSDE 310",
    "memberId": "492-3849102-01"
  }
}
```

#### C. Recuperar Contraseña
* **Método:** `POST`
* **Ruta:** `/api/auth/forgot-password`
* **Request:** `{ "email": "paciente@email.com" }`
* **Response (200 OK):** `{ "success": true, "message": "Enlace enviado" }`

#### D. Perfil de Paciente Autenticado
* **Método:** `GET`
* **Ruta:** `/api/patient/me`
* **Requiere Auth:** Sí (`Bearer <token>`)
* **Response (200 OK):** Devuelve el objeto `user` con datos clínicos y cobertura.

---

### 3.2. Gestión de Turnos y Citas (`/api/patient/appointments` y `/api/appointments`)

#### A. Listar Turnos del Paciente
* **Método:** `GET`
* **Ruta:** `/api/patient/appointments`
* **Requiere Auth:** Sí
* **Response (200 OK):** Array de turnos:
```json
[
  {
    "id": "apt-rossi-01",
    "doctorName": "Dr. Alejandro Rossi",
    "doctorLicense": "M.N. 104.892",
    "specialty": "Cardiología Clínica",
    "appointmentDate": "2024-10-24T15:30:00Z",
    "displayDate": "Jueves 24 de Octubre de 2024",
    "displayTime": "15:30 hs",
    "relativeTime": "En 4 días",
    "venue": "Sede Central Belgrano (Cons. 304)",
    "venueAddress": "Av. Cabildo 1845, CABA",
    "coverageProvider": "OSDE 310 • Plan Médico",
    "coverageStatus": "Autorización al día",
    "managementDeadline": "Gestión online hasta el 23/10 15:30 hs",
    "rule": "gestion_habilitada",
    "status": "confirmado",
    "isNext": true
  }
]
```

#### B. Obtener Cupos y Fechas Disponibles
* **Método:** `GET`
* **Ruta:** `/api/appointments/available-slots?specialty=Cardiolog%C3%ADa&doctor=Dr.+Rossi`
* **Requiere Auth:** No
* **Response (200 OK):**
```json
[
  {
    "id": "date-vie-25",
    "dateKey": "vie-25",
    "label": "Viernes 25 Oct",
    "dayName": "Viernes",
    "dateMetric": "25 Oct",
    "dateDisplay": "Viernes 25 de Octubre",
    "slotsCount": 6,
    "slots": [
      { "id": "s-1", "time": "09:00 hs", "period": "morning" },
      { "id": "s-4", "time": "14:30 hs", "period": "afternoon" }
    ]
  }
]
```

#### C. Reservar Nuevo Turno
* **Método:** `POST`
* **Ruta:** `/api/patient/appointments`
* **Requiere Auth:** Sí
* **Request DTO:**
```java
public record BookAppointmentInput(
    @NotBlank String specialty,
    @NotBlank String doctorName,
    String doctorLicense,
    @NotBlank String venue,
    String venueAddress,
    @NotBlank String dateDisplay,
    @NotBlank String timeDisplay,
    @NotBlank String coverageProvider,
    String reason
) {}
```
* **Response (201 Created):** Retorna el objeto `Appointment` creado con su ID generado.

#### D. Cancelar Turno
* **Método:** `PATCH`
* **Ruta:** `/api/patient/appointments/{id}/cancel`
* **Requiere Auth:** Sí
* **Request:** `{ "reason": "Motivo de cancelación" }`
* **Response (200 OK):** Retorna el `Appointment` actualizado con `status: "cancelado"`.

#### E. Reprogramar Turno
* **Método:** `PATCH`
* **Ruta:** `/api/patient/appointments/{id}/reschedule`
* **Requiere Auth:** Sí
* **Request DTO:**
```java
public record RescheduleAppointmentInput(
    @NotBlank String newDate,
    @NotBlank String newTime
) {}
```
* **Response (200 OK):** Retorna el `Appointment` con la nueva fecha/hora y `status: "confirmado"`.

---

### 3.3. Triage Asistido por IA (`/api/triage`)

#### Evaluar Síntomas Clínicos
* **Método:** `POST`
* **Ruta:** `/api/triage/evaluate`
* **Requiere Auth:** No (accesible público o autenticado)
* **Request DTO:**
```java
public record TriageEvaluationInput(
    @NotBlank String chiefComplaint,
    List<String> symptoms,
    int painLevel,
    String duration, // "under_24h", "1_to_3_days", "over_week"
    List<String> riskFactors,
    Map<String, Object> vitalSigns
) {}
```
* **Response (200 OK):**
```json
{
  "caseId": "TRG-2024-8849",
  "esiLevel": 3,
  "recommendedSpecialty": "Neurología / Guardia Clínica",
  "suggestedAction": "Consulta médica presencial para evaluación y control hemodinámico",
  "timeframe": "Dentro de las próximas 4 a 6 horas",
  "findings": [
    {
      "title": "Cefalea tensional / migrañosa recurrente",
      "detail": "Patrón pulsátil unilateral asociado a fotofobia sin signos de focalidad neurológica aguda."
    },
    {
      "title": "Presión arterial y signos vitales estables",
      "detail": "Parámetros basales dentro del rango de normotensión (120/80 mmHg, SpO2 98%)."
    }
  ],
  "algorithmVersion": "ESI v4.2 Medical AI Core",
  "standard": "Norma Internacional ESI (Emergency Severity Index)"
}
```

---

### 3.4. Historia Clínica Digital (`/api/patient/records` y `/api/patient/profile`)

#### A. Listar Historial y Consultas Pasadas
* **Método:** `GET`
* **Ruta:** `/api/patient/records?year=2024`
* **Requiere Auth:** Sí
* **Response (200 OK):** Array de `MedicalConsultation`.

#### B. Obtener Ficha Clínica Resumida
* **Método:** `GET`
* **Ruta:** `/api/patient/profile`
* **Requiere Auth:** Sí
* **Response (200 OK):**
```json
{
  "fullName": "María Florencia Gómez",
  "docNumber": "38.452.901",
  "age": 32,
  "coverage": "OSDE 310",
  "memberNumber": "492-3849102-01",
  "bloodType": "0 Positivo (0+)",
  "allergies": [
    {
      "allergen": "Penicilina y derivados betalactámicos",
      "registeredBy": "Registrado por Alergología Central",
      "isVerified": true
    }
  ],
  "activeMedications": "Ninguna registrada",
  "medicationNotes": "Sin prescripciones de tratamiento prolongado vigentes.",
  "lastSyncTime": "Hoy a las 11:42 hs",
  "networkStatus": "Historia Clínica Electrónica sincronizada en tiempo real con Nodo Central HL7 / FHIR."
}
```

---

### 3.5. Mesa de Ayuda y Chat (`/api/support`)

#### A. Crear Ticket de Soporte por Correo
* **Método:** `POST`
* **Ruta:** `/api/support/tickets`
* **Content-Type:** `multipart/form-data` o `application/json`
* **Campos:** `name`, `email`, `category`, `priority`, `subject`, `message`, `file` (opcional, hasta 10MB).
* **Response (201 Created):**
```json
{
  "success": true,
  "ticketCode": "TKT-584912",
  "createdAt": "14:32",
  "message": "Ticket registrado con éxito"
}
```

#### B. Chat Asistencial
* **Método:** `POST`
* **Ruta:** `/api/support/chat/message`
* **Request:** `{ "sessionId": "chat-session-1234", "text": "Dónde queda la guardia?" }`
* **Response (200 OK):**
```json
{
  "id": "msg-8812",
  "sender": "bot",
  "text": "Nuestra red cuenta con Guardia de Emergencias las 24 horas...",
  "timestamp": "14:33",
  "isEmergency": false,
  "actions": [
    { "label": "Ver teléfonos de guardia", "action": "telefonos_guardia" }
  ]
}
```

---

## 4. Mapeo con Funciones PL/pgSQL y PostgreSQL

Si utilizas funciones o procedimientos almacenados en PostgreSQL:
* `sp_register_patient(p_data JSONB)` -> puede retornar el `user_id` y generar el hash con `crypt(p_password, gen_salt('bf', 10))`.
* `sp_evaluate_triage(p_symptoms JSONB)` -> puede insertar en `triage_records` y clasificar el nivel ESI según reglas clínicas en base de datos.
* `sp_book_appointment(p_user_id UUID, p_slot_id UUID)` -> valida disponibilidad y bloquea el slot con control de concurrencia (`FOR UPDATE`).

---
*Documento mantenido para la integración entre Frontend Sentria AI y Backend Java / PL/pgSQL.*
