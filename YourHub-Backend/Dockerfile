# Etap 1: Budowanie przy uzyciu obrazu z Mavenem
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Kopiowanie pom.xml (optymalizacja cache Dockera)
COPY pom.xml .

# Ze wzgledu na optymalizacje nie pobieramy wszystkiego z gory jak zwykle (offline)
# pobierze sie przy buildzie

# Kopiowanie kodu zrodlowego
COPY src ./src

# Budowa paczki JAR (pomijamy testy by bylo szybciej)
RUN mvn clean package -DskipTests

# Etap 2: Uruchomienie aplikacji w lzejszym kontenerze
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Kopiowanie zbudowanego JAR-a z poprzedniego etapu
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Wystawiamy port, na ktorym nasluchuje Spring Boot
EXPOSE 8080

# Komenda uruchamiajaca nasza aplikacje Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
