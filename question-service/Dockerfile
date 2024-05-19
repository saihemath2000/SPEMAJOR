FROM openjdk:17
ARG JAR_FILE=target/question-service-0.0.1.jar
COPY ${JAR_FILE} /app/
WORKDIR /app
ENTRYPOINT ["java","-jar","question-service-0.0.1.jar"]
EXPOSE 8080
