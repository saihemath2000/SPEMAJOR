FROM openjdk:17
ARG JAR_FILE=target/contribute-service-0.0.1.jar
COPY ${JAR_FILE} /app/
WORKDIR /app
ENTRYPOINT ["java","-jar","contribute-service-0.0.1.jar"]
EXPOSE 8082
