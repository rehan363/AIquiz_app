from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL_DATABASE = "postgresql://postgress:postgresql007@localhost:5432/QuizApplication"

engine = create_engine(URL_DATABASE)

Sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

base = declarative_base()