-- Insert a new survey
INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published])
VALUES ('Sports Preferences and Participation Survey', 'Tell us about your favorite sports and your involvement in sports activities.', '2023-10-15', '2023-10-31', 1);

-- Get the ID of the inserted survey
DECLARE @SurveyId INT;
SET @SurveyId = SCOPE_IDENTITY();

-- Insert the first question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your favorite sport to watch or follow?');

-- Get the ID of the inserted question
DECLARE @QuestionId1 INT;
SET @QuestionId1 = SCOPE_IDENTITY();

-- Insert options for the first question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId1, 'Football (American)'),
       (@QuestionId1, 'Soccer'),
       (@QuestionId1, 'Basketball'),
       (@QuestionId1, 'Baseball'),
       (@QuestionId1, 'Tennis'),

-- Insert the second question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Do you participate in any sports or physical activities regularly?');

-- Get the ID of the inserted question
DECLARE @QuestionId2 INT;
SET @QuestionId2 = SCOPE_IDENTITY();

-- Insert options for the second question
INSERT INTO [Option] ([QuestionId],[OptionText])
VALUES (@QuestionId2, 'Yes, I play sports regularly'),
       (@QuestionId2, 'Yes, I engage in regular physical activities'),
       (@QuestionId2, 'No, I do not participate in sports or physical activities');

-- Insert the third question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What sports or physical activities do you participate in regularly?');

-- Get the ID of the inserted question
DECLARE @QuestionId3 INT;
SET @QuestionId3 = SCOPE_IDENTITY();

-- Insert the fourth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What motivates your interest in sports?');

-- Get the ID of the inserted question
DECLARE @QuestionId4 INT;
SET @QuestionId4 = SCOPE_IDENTITY();

-- Insert options for the fourth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId4, 'Competition and winning'),
       (@QuestionId4, 'Physical fitness and health'),
       (@QuestionId4, 'Enjoyment and leisure'),
       (@QuestionId4, 'Social interaction and team dynamics');

-- Insert the fifth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Have you ever attended a live sports event?');

-- Get the ID of the inserted question
DECLARE @QuestionId5 INT;
SET @QuestionId5 = SCOPE_IDENTITY();

-- Insert options for the fifth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId5, 'Yes, I attend live sports events regularly'),
       (@QuestionId5, 'Yes, I have attended a few live sports events'),
       (@QuestionId5, 'No, I have never attended a live sports event');
