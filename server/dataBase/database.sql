CREATE DATABASE IF NOT EXISTS 'BotTrader';
USE 'BotTrader';

CREATE TABLE trader (
    id_trader INT NOT NULL auto_incremet primary key,
    type_operation char(3) not null,
    stop float null,
    lostHigh float null,
    status varchar(20) 
);

CREATE TABLE positionOrder (
    id_positionOrder INT NOT NULL auto_incremet primary key,
    type_order varchar(20) not null,
    id_trader int,
    value float not null,
    riskStopLost float null,
    sizeLotePosition float null,
    sizePosition float null,
    porcentageAboveOrder float null,
    porcentageStopLost float null,
    level int(2) null,
    status varchar(20),
    FOREIGN KEY (id_trader) REFERENCES trader(id_trader)
);