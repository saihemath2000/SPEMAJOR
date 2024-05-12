FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} /app/config-server.jar
WORKDIR /app
ENTRYPOINT ["java","-jar","config-server.jar"]
EXPOSE 9296
