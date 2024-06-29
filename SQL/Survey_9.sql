-- Insert a new survey
INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published])
VALUES ('Reading Habits Survey', 'Tell us about your reading habits and favorite books.', '2023-10-15', '2023-10-31', 1);

-- Get the ID of the inserted survey
DECLARE @SurveyId INT;
SET @SurveyId = SCOPE_IDENTITY();

-- Insert the first question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your favorite genre of books?');

-- Get the ID of the inserted question
DECLARE @QuestionId1 INT;
SET @QuestionId1 = SCOPE_IDENTITY();

-- Insert options for the first question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId1, 'Mystery/Thriller'),
       (@QuestionId1, 'Science Fiction/Fantasy'),
       (@QuestionId1, 'Romance'),
       (@QuestionId1, 'Biography/Memoir'),
       (@QuestionId1, 'Non-Fiction'),
       (@QuestionId1, 'Other (please specify)');

-- Insert the second question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'How often do you read books?');

-- Get the ID of the inserted question
DECLARE @QuestionId2 INT;
SET @QuestionId2 = SCOPE_IDENTITY();

-- Insert options for the second question
INSERT INTO [Option] ([QuestionId],[OptionText])
VALUES (@QuestionId2, 'Daily'),
       (@QuestionId2, 'Weekly'),
       (@QuestionId2, 'Monthly'),
       (@QuestionId2, 'Rarely or never');

-- Insert the third question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Where do you prefer to read books?');

-- Get the ID of the inserted question
DECLARE @QuestionId3 INT;
SET @QuestionId3 = SCOPE_IDENTITY();

-- Insert options for the third question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId3, 'At home'),
       (@QuestionId3, 'Library'),
       (@QuestionId3, 'Café or coffee shop'),
       (@QuestionId3, 'Outdoors'),
       (@QuestionId3, 'Other (please specify)');

-- Insert the fourth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Do you prefer physical books or e-books?');

-- Get the ID of the inserted question
DECLARE @QuestionId4 INT;
SET @QuestionId4 = SCOPE_IDENTITY();

-- Insert options for the fourth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId4, 'Physical books'),
       (@QuestionId4, 'E-books'),
       (@QuestionId4, 'Both');
       
-- Insert the fifth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your all-time favorite book?');

-- Get the ID of the inserted question
DECLARE @QuestionId5 INT;
SET @QuestionId5 = SCOPE_IDENTITY();

-- Insert the sixth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Do you belong to a book club or reading group?');

-- Get the ID of the inserted question
DECLARE @QuestionId6 INT;
SET @QuestionId6 = SCOPE_IDENTITY();

-- Insert options for the sixth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId6, 'Yes, I'm an active member'),
       (@QuestionId6, 'No, I prefer solo reading');
