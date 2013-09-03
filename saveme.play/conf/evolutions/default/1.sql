# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table bookmark (
  id                        bigint not null,
  title                     varchar(255),
  url                       varchar(255),
  description               varchar(255),
  image_url                 varchar(255),
  constraint pk_bookmark primary key (id))
;

create sequence bookmark_seq;




# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists bookmark;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists bookmark_seq;

