FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} /app/question-service.jar
WORKDIR /app
ENTRYPOINT ["java","-jar","question-service.jar"]
EXPOSE 8080
