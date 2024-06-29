-- Insert a new survey
INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published])
VALUES ('Food Preferences and Dining Habits Survey', 'Share your favorite foods, cooking habits, and dining choices.', '2023-10-15', '2023-10-31', 1);

-- Get the ID of the inserted survey
DECLARE @SurveyId INT;
SET @SurveyId = SCOPE_IDENTITY();

-- Insert the first question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your favorite type of cuisine?');

-- Get the ID of the inserted question
DECLARE @QuestionId1 INT;
SET @QuestionId1 = SCOPE_IDENTITY();

-- Insert the options for the first question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId1, 'Italian'),
       (@QuestionId1, 'Chinese'),
       (@QuestionId1, 'Mexican'),
       (@QuestionId1, 'Indian'),
       (@QuestionId1, 'Mediterranean');

-- Insert the second question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'How often do you dine out or order takeout?');

-- Get the ID of the inserted question
DECLARE @QuestionId2 INT;
SET @QuestionId2 = SCOPE_IDENTITY();

-- Insert the options for the second question
INSERT INTO [Option] ([QuestionId],[OptionText])
VALUES (@QuestionId2, 'Frequently'),
       (@QuestionId2, 'Occasionally'),
       (@QuestionId2, 'Rarely'),
       (@QuestionId2, 'Almost never');

-- Insert the third question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your favorite dish to cook at home?');

-- Get the ID of the inserted question
DECLARE @QuestionId3 INT;
SET @QuestionId3 = SCOPE_IDENTITY();

-- Insert the fourth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Do you have any dietary restrictions or preferences?');

-- Get the ID of the inserted question
DECLARE @QuestionId4 INT;
SET @QuestionId4 = SCOPE_IDENTITY();

-- Insert the options for the fourth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId4, 'Vegetarian'),
       (@QuestionId4, 'Vegan'),
       (@QuestionId4, 'Gluten-free'),
       (@QuestionId4, 'Keto'),
       (@QuestionId4, 'No restrictions');

-- Insert the fifth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'What is your favorite dessert?');

-- Get the ID of the inserted question
DECLARE @QuestionId5 INT;
SET @QuestionId5 = SCOPE_IDENTITY();

-- Insert the options for the fifth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId5, 'Chocolate cake'),
       (@QuestionId5, 'Ice cream'),
       (@QuestionId5, 'Cheesecake'),
       (@QuestionId5, 'Fruit tart');

-- Insert the sixth question for the survey
INSERT INTO [Questions] ([SurveyId], [QuestionText])
VALUES (@SurveyId, 'Where do you prefer to enjoy a meal?');

-- Get the ID of the inserted question
DECLARE @QuestionId6 INT;
SET @QuestionId6 = SCOPE_IDENTITY();

-- Insert the options for the sixth question
INSERT INTO [Option] ([QuestionId], [OptionText])
VALUES (@QuestionId6, 'At home'),
       (@QuestionId6, 'Restaurant'),
       (@QuestionId6, 'Picnic in the park'),
       (@QuestionId6, 'Cafeteria at work or school');
