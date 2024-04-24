FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} quiz-service.jar
ENTRYPOINT ["java","-jar","/quiz-service.jar"]
EXPOSE 8090