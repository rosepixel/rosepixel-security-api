CREATE TABLE `security`.`user` (
  `user_id` varchar(36) CHARACTER SET utf8mb4 NOT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `secret` varchar(36) CHARACTER SET utf8mb4 NOT NULL,
  `iv` varchar(36) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


CREATE TRIGGER `security`.`before_insert_user`
BEFORE INSERT ON `security`.`user`
   FOR EACH ROW
   SET NEW.`user_id` = UUID();