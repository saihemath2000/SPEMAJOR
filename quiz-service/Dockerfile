FROM openjdk:17
ARG JAR_FILE=target/quiz-service-0.0.1.jar
COPY ${JAR_FILE} /app/
WORKDIR /app
ENTRYPOINT ["java","-jar","quiz-service-0.0.1.jar"]
EXPOSE 8090
