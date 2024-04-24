FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} question-service.jar
ENTRYPOINT ["java","-jar","/question-service.jar"]
EXPOSE 8080