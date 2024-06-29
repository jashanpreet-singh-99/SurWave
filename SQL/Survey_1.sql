-- Insert a new survey 

INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published]) 
VALUES ('Favorite Ice Cream Survey', 'Tell us your favorite ice cream flavors.', '2023-10-15', '2023-10-31', 1); 

  
-- Get the ID of the inserted survey 
DECLARE @SurveyId INT; 
SET @SurveyId = SCOPE_IDENTITY(); 

  
-- Insert the first question for the survey 
INSERT INTO [Questions] ([SurveyId], [QuestionText]) 
VALUES (@SurveyId, 'What is your favorite ice cream flavor?'); 


-- Get the ID of the inserted question 
DECLARE @QuestionId1 INT; 
SET @QuestionId1 = SCOPE_IDENTITY(); 

  
-- Insert options for the first question 
INSERT INTO [Option] ([QuestionId], [OptionText]) 
VALUES (@QuestionId1, 'Vanilla'), 
       (@QuestionId1, 'Chocolate'), 
       (@QuestionId1, 'Strawberry'); 

  
-- Insert the second question for the survey 
INSERT INTO [Questions] ([SurveyId], [QuestionText]) 
VALUES (@SurveyId, 'How often do you eat ice cream?'); 

  
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
VALUES (@SurveyId, 'Which ice cream topping is your favorite?'); 


-- Get the ID of the inserted question 
DECLARE @QuestionId3 INT; 
SET @QuestionId3 = SCOPE_IDENTITY(); 


-- Insert options for the third question 
INSERT INTO [Option] ([QuestionId], [OptionText]) 
VALUES (@QuestionId3, 'Chocolate syrup'), 
       (@QuestionId3, 'Sprinkles'), 
       (@QuestionId3, 'Whipped cream'), 
       (@QuestionId3, 'Nuts'); 
  

-- Insert the fourth question for the survey 
INSERT INTO [Questions] ([SurveyId], [QuestionText]) 
VALUES (@SurveyId, 'Do you prefer a cone or a cup for your ice cream?'); 
  

-- Get the ID of the inserted question 
DECLARE @QuestionId4 INT; 
SET @QuestionId4 = SCOPE_IDENTITY(); 
  

-- Insert options for the fourth question 
INSERT INTO [Option] ([QuestionId], [OptionText]) 
VALUES (@QuestionId4, 'Cone'), 
       (@QuestionId4, 'Cup'); 
  

-- Insert the fifth question for the survey 
INSERT INTO [Questions] ([SurveyId], [QuestionText]) 
VALUES (@SurveyId, 'Have you tried any unique ice cream flavors?'); 

  
-- Get the ID of the inserted question 
DECLARE @QuestionId5 INT; 
SET @QuestionId5 = SCOPE_IDENTITY(); 
  

-- Insert options for the fifth question 
INSERT INTO [Option] ([QuestionId], [OptionText]) 
VALUES (@QuestionId5, 'Yes, I love trying new flavors!'), 
       (@QuestionId5, 'No, I stick to traditional flavors'); 

  

-- Insert the sixth question for the survey 
INSERT INTO [Questions] ([SurveyId], [QuestionText]) 
VALUES (@SurveyId, 'Where do you usually enjoy ice cream?'); 
  

-- Get the ID of the inserted question 
DECLARE @QuestionId6 INT; 
SET @QuestionId6 = SCOPE_IDENTITY(); 


-- Insert options for the sixth question 
INSERT INTO [Option] ([QuestionId], [OptionText]) 
VALUES (@QuestionId6, 'At home'), 
       (@QuestionId6, 'Ice cream parlor'), 
       (@QuestionId6, 'Park or beach'), 
       (@QuestionId6, 'Other (please specify)'); 


-- Insert the seventh question for the survey 
INSERT INTO [Questions] ([SurveyId], [QuestionText]) 
VALUES (@SurveyId, 'Which ice cream flavor do you dislike the most?'); 


-- Get the ID of the inserted question 
DECLARE @QuestionId7 INT; 
SET @QuestionId7 = SCOPE_IDENTITY(); 
  

-- Insert options for the seventh question 

INSERT INTO [Option] ([QuestionId], [OptionText]) 
VALUES (@QuestionId7, 'Mint chocolate chip'), 
       (@QuestionId7, 'Rum raisin'), 
       (@QuestionId7, 'Bubblegum'); 
  

-- Insert the eighth question for the survey 
INSERT INTO [Questions] ([SurveyId], [QuestionText]) 
VALUES (@SurveyId, 'Do you enjoy ice cream in the winter?'); 
  

-- Get the ID of the inserted question 
DECLARE @QuestionId8 INT; 
SET @QuestionId8 = SCOPE_IDENTITY(); 
  

-- Insert options for the eighth question 
INSERT INTO [Option] ([QuestionId], [OptionText]) 
VALUES (@QuestionId8, 'Yes, I enjoy it year-round'), 
       (@QuestionId8, 'No, its too cold for ice cream'); 
  

-- Insert the ninth question for the survey 
INSERT INTO [Questions] ([SurveyId], [QuestionText]) 
VALUES (@SurveyId, 'Which is your favorite ice cream brand?'); 
  

-- Get the ID of the inserted question 
DECLARE @QuestionId9 INT; 
SET @QuestionId9 = SCOPE_IDENTITY(); 
  

-- Insert options for the ninth question 
INSERT INTO [Option] ([QuestionId], [OptionText]) 
VALUES (@QuestionId9, 'Ben & Jerry''s'), 
       (@QuestionId9, 'Haagen-Dazs'), 
       (@QuestionId9, 'Baskin-Robbins'), 
       (@QuestionId9, 'Local artisanal brands'); 
  

-- Insert the tenth question for the survey 
INSERT INTO [Questions] ([SurveyId], [QuestionText]) 
VALUES (@SurveyId, 'How many scoops of ice cream do you usually have at once?'); 
  

-- Get the ID of the inserted question 
DECLARE @QuestionId10 INT; 
SET @QuestionId10 = SCOPE_IDENTITY(); 
  

-- Insert options for the tenth question 
INSERT INTO [Option] ([QuestionId], [OptionText]) 
VALUES (@QuestionId10, 'One scoop'), 
       (@QuestionId10, 'Two scoops'), 
       (@QuestionId10, 'Three or more scoops'); 

 