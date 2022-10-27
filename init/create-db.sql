DROP SCHEMA IF EXISTS movie_db;
CREATE SCHEMA movie_db;
CREATE TABLE movie_db.title(tconst CHAR(10), titleType VARCHAR(255), primaryTitle VARCHAR(1000), originalTitle VARCHAR(1000), isAdult VARCHAR(255), startYear VARCHAR(255), endYear VARCHAR(255), runtimeMinutes VARCHAR(255), genres VARCHAR(255), PRIMARY KEY (tconst), FULLTEXT(originalTitle, primaryTitle));
LOAD DATA INFILE "/var/lib/mysql-files/title.basics.tsv/data.tsv" INTO TABLE movie_db.title;