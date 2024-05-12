FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} /app/api-gateway.jar
WORKDIR /app
ENTRYPOINT ["java","-jar","api-gateway.jar"]
EXPOSE 8765
