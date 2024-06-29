-- Insert a new survey
INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published])
VALUES ('Fitness and Exercise Habits Survey', 'Share your fitness and exercise routines and preferences.', '2023-10-15', '2023-10-31', 1);

-- Get the ID of the inserted survey
DECLARE @SurveyId INT;
SET @SurveyId = SCOPE_IDENTITY();

-- Insert the first question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your favorite type of exercise or workout?');

-- Get the ID of the inserted question
DECLARE @QuestionId1 INT;
SET @QuestionId1 = SCOPE_IDENTITY();

-- Insert options for the first question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId1, 'Running/jogging'),
       (@QuestionId1, 'Weightlifting'),
       (@QuestionId1, 'Yoga/Pilates'),
       (@QuestionId1, 'Cycling'),
       (@QuestionId1, 'Swimming'),
       (@QuestionId1, 'Other (please specify)');

-- Insert the second question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'How often do you exercise?');

-- Get the ID of the inserted question
DECLARE @QuestionId2 INT;
SET @QuestionId2 = SCOPE_IDENTITY();

-- Insert options for the second question
INSERT INTO [Option] ([QuestionId],[OptionText])
VALUES (@QuestionId2, 'Daily'),
       (@QuestionId2, '3-5 times a week'),
       (@QuestionId2, '1-2 times a week'),
       (@QuestionId2, 'Rarely or never');

-- Insert the third question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Where do you prefer to work out or exercise?');

-- Get the ID of the inserted question
DECLARE @QuestionId3 INT;
SET @QuestionId3 = SCOPE_IDENTITY();

-- Insert options for the third question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId3, 'Gym or fitness center'),
       (@QuestionId3, 'Home'),
       (@QuestionId3, 'Outdoors'),
       (@QuestionId3, 'Yoga/Pilates studio'),
       (@QuestionId3, 'Other (please specify)');

-- Insert the fourth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What are your fitness goals?');

-- Get the ID of the inserted question
DECLARE @QuestionId4 INT;
SET @QuestionId4 = SCOPE_IDENTITY();

-- Insert options for the fourth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId4, 'Weight loss'),
       (@QuestionId4, 'Muscle gain'),
       (@QuestionId4, 'Improved flexibility'),
       (@QuestionId4, 'Stress relief'),
       (@QuestionId4, 'Other (please specify)');

-- Insert the fifth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Do you use fitness apps or wearables to track your progress?');

-- Get the ID of the inserted question
DECLARE @QuestionId5 INT;
SET @QuestionId5 = SCOPE_IDENTITY();

-- Insert options for the fifth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId5, 'Yes, I use fitness apps/wearables regularly'),
       (@QuestionId5, 'No, I dont use fitness technology');

-- Insert the sixth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What time of day do you prefer to work out or exercise?');

-- Get the ID of the inserted question
DECLARE @QuestionId6 INT;
SET @QuestionId6 = SCOPE_IDENTITY();

-- Insert options for the sixth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId6, 'Morning'),
       (@QuestionId6, 'Afternoon'),
       (@QuestionId6, 'Evening');
