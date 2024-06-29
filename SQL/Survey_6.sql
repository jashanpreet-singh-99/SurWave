-- Insert a new survey
INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published])
VALUES ('Music Preferences Survey', 'Tell us about your music preferences and habits.', '2023-10-15', '2023-10-31', 1);

-- Get the ID of the inserted survey
DECLARE @SurveyId INT;
SET @SurveyId = SCOPE_IDENTITY();

-- Insert the first question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your favorite music genre?');

-- Get the ID of the inserted question
DECLARE @QuestionId1 INT;
SET @QuestionId1 = SCOPE_IDENTITY();

-- Insert options for the first question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId1, 'Rock'),
       (@QuestionId1, 'Pop'),
       (@QuestionId1, 'Hip-hop'),
       (@QuestionId1, 'Country'),
       (@QuestionId1, 'Electronic'),
       (@QuestionId1, 'Classical'),
       (@QuestionId1, 'Other (please specify)');

-- Insert the second question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'How often do you listen to music?');

-- Get the ID of the inserted question
DECLARE @QuestionId2 INT;
SET @QuestionId2 = SCOPE_IDENTITY();

-- Insert options for the second question
INSERT INTO [Option] ([QuestionId],[OptionText])
VALUES (@QuestionId2, 'Daily'),
       (@QuestionId2, 'Weekly'),
       (@QuestionId2, 'Monthly'),
       (@QuestionId2, 'Rarely');

-- Insert the third question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Do you attend live music concerts?');

-- Get the ID of the inserted question
DECLARE @QuestionId3 INT;
SET @QuestionId3 = SCOPE_IDENTITY();

-- Insert options for the third question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId3, 'Frequently'),
       (@QuestionId3, 'Occasionally'),
       (@QuestionId3, 'Rarely'),
       (@QuestionId3, 'Never');

-- Insert the fourth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Where do you usually listen to music?');

-- Get the ID of the inserted question
DECLARE @QuestionId4 INT;
SET @QuestionId4 = SCOPE_IDENTITY();

-- Insert options for the fourth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId4, 'At home'),
       (@QuestionId4, 'In the car'),
       (@QuestionId4, 'At work or school'),
       (@QuestionId4, 'At live concerts'),
       (@QuestionId4, 'Other (please specify)');

-- Insert the fifth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your favorite music streaming service?');

-- Get the ID of the inserted question
DECLARE @QuestionId5 INT;
SET @QuestionId5 = SCOPE_IDENTITY();

-- Insert options for the fifth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId5, 'Spotify'),
       (@QuestionId5, 'Apple Music'),
       (@QuestionId5, 'Amazon Music'),
       (@QuestionId5, 'YouTube Music'),
       (@QuestionId5, 'Other (please specify)');

-- Insert the sixth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Do you play a musical instrument?');

-- Get the ID of the inserted question
DECLARE @QuestionId6 INT;
SET @QuestionId6 = SCOPE_IDENTITY();

-- Insert options for the sixth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId6, 'Yes, I play one or more instruments'),
       (@QuestionId6, 'No, I do not play any instrument');

-- Insert the seventh question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Who is your favorite music artist or band?');

-- Get the ID of the inserted question
DECLARE @QuestionId7 INT;
SET @QuestionId7 = SCOPE_IDENTITY();

-- Insert the eighth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'How do you discover new music?');

-- Get the ID of the inserted question
DECLARE @QuestionId8 INT;
SET @QuestionId8 = SCOPE_IDENTITY();

-- Insert options for the eighth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId8, 'Through friends and family'),
       (@QuestionId8, 'Music streaming services'),
       (@QuestionId8, 'Radio'),
       (@QuestionId8, 'Concerts and live performances'),
       (@QuestionId8, 'Other (please specify)');
