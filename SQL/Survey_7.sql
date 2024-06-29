-- Insert a new survey
INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published])
VALUES ('Travel Preferences Survey', 'Tell us about your travel preferences and experiences.', '2023-10-15', '2023-10-31', 1);

-- Get the ID of the inserted survey
DECLARE @SurveyId INT;
SET @SurveyId = SCOPE_IDENTITY();

-- Insert the first question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your favorite type of travel destination?');

-- Get the ID of the inserted question
DECLARE @QuestionId1 INT;
SET @QuestionId1 = SCOPE_IDENTITY();

-- Insert options for the first question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId1, 'Beach resort'),
       (@QuestionId1, 'Mountain retreat'),
       (@QuestionId1, 'City exploration'),
       (@QuestionId1, 'Cultural and historical sites'),
       (@QuestionId1, 'Adventure and outdoor activities'),
       (@QuestionId1, 'Other (please specify)');

-- Insert the second question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'How often do you travel for leisure?');

-- Get the ID of the inserted question
DECLARE @QuestionId2 INT;
SET @QuestionId2 = SCOPE_IDENTITY();

-- Insert options for the second question
INSERT INTO [Option] ([QuestionId],[OptionText])
VALUES (@QuestionId2, 'Several times a year'),
       (@QuestionId2, 'Once a year'),
       (@QuestionId2, 'Every few years'),
       (@QuestionId2, 'Rarely or never');

-- Insert the third question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What type of accommodation do you prefer when traveling?');

-- Get the ID of the inserted question
DECLARE @QuestionId3 INT;
SET @QuestionId3 = SCOPE_IDENTITY();

-- Insert options for the third question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId3, 'Luxury hotels'),
       (@QuestionId3, 'Budget accommodations'),
       (@QuestionId3, 'Vacation rentals'),
       (@QuestionId3, 'Camping or RVs'),
       (@QuestionId3, 'Other (please specify)');

-- Insert the fourth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What motivates your travel choices?');

-- Get the ID of the inserted question
DECLARE @QuestionId4 INT;
SET @QuestionId4 = SCOPE_IDENTITY();

-- Insert options for the fourth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId4, 'Exploring new cultures'),
       (@QuestionId4, 'Relaxation and escape'),
       (@QuestionId4, 'Adventure and adrenaline'),
       (@QuestionId4, 'Food and culinary experiences'),
       (@QuestionId4, 'Other (please specify)');

-- Insert the fifth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Have you ever traveled solo?');

-- Get the ID of the inserted question
DECLARE @QuestionId5 INT;
SET @QuestionId5 = SCOPE_IDENTITY();

-- Insert options for the fifth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId5, 'Yes, I love solo travel'),
       (@QuestionId5, 'No, I prefer traveling with others');

-- Insert the sixth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your preferred mode of transportation when traveling?');

-- Get the ID of the inserted question
DECLARE @QuestionId6 INT;
SET @QuestionId6 = SCOPE_IDENTITY();

-- Insert options for the sixth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId6, 'Airplane'),
       (@QuestionId6, 'Car or road trip'),
       (@QuestionId6, 'Train'),
       (@QuestionId6, 'Cruise'),
       (@QuestionId6, 'Other (please specify)');

-- Insert the seventh question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your dream travel destination?');

-- Get the ID of the inserted question
DECLARE @QuestionId7 INT;
SET @QuestionId7 = SCOPE_IDENTITY();

-- Insert the eighth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Do you use travel apps or websites to plan your trips?');

-- Get the ID of the inserted question
DECLARE @QuestionId8 INT;
SET @QuestionId8 = SCOPE_IDENTITY();

-- Insert options for the eighth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId8, 'Yes, I frequently use travel apps/websites'),
       (@QuestionId8, 'No, I prefer traditional planning methods');
