CREATE TABLE user (
                id BIGINT NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL,
                CONSTRAINT PK_id PRIMARY KEY (id)
            );
        </sql>
        <rollback>
            DROP TABLE user;
        </rollback>