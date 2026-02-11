# 1. Build stage (utilisation d'une image maven pour compiler l'application)
FROM maven:3.9.12-eclipse-temurin-11-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# On compile le projet et on génère le jar (sans les tests pour accélérer)
RUN mvn clean package -DskipTests

# 2. Run stage (utilisation d'une image plus légère pour exécuter l'application)
FROM eclipse-temurin:11-jre-alpine
WORKDIR /app
# On copie le jar généré depuis l'étape de build
COPY --from=build /app/target/*.jar app.jar

# On expose le port sur lequel l'application va tourner
EXPOSE 8080

# On définit le point d'entrée pour exécuter l'application
ENTRYPOINT ["java", "-jar", "app.jar"]