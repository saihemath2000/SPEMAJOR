FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} /app/contribute-service.jar
WORKDIR /app
ENTRYPOINT ["java","-jar","contribute-service.jar"]
EXPOSE 8082
