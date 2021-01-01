CREATE TABLE `security`.`user` (
  `user_id` INT NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

CREATE TRIGGER `security`.`before_insert_user`
BEFORE INSERT ON `security`.`user`
   FOR EACH ROW
   SET NEW.`user_id` = UUID_TO_BIN(UUID());