-- CreateTrigger
CREATE TRIGGER tgr_add_content AFTER UPDATE
ON suggestion
FOR EACH ROW
BEGIN
	IF NEW.status = 'APPROVED' AND NEW.type = 'INSERT' THEN
		INSERT INTO content VALUES (UUID(), NEW.content_description, NEW.content_link, NEW.content_value, NEW.content_level, NEW.content_type, 'ACTIVE', NEW.content_id_community);
	END IF;
END;

-- CreateTrigger
CREATE TRIGGER tgr_edit_content AFTER UPDATE
ON suggestion
FOR EACH ROW
BEGIN
	IF NEW.status = 'APPROVED' AND NEW.type = 'ALTER' THEN
		UPDATE content set description = NEW.content_description, link = NEW.content_link, value = NEW.content_value, level = NEW.content_level, type = NEW.content_type WHERE id = NEW.id_content;
	END IF;
END;

-- CreateTrigger
CREATE TRIGGER tgr_remove_content AFTER UPDATE
ON suggestion
FOR EACH ROW
BEGIN
	IF NEW.status = 'APPROVED' AND NEW.type = 'DELETE' THEN
        DELETE FROM content WHERE id = NEW.id_content;
	END IF;
END;