-- Insert a new survey about cars 

INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published])   
VALUES ('Sports survey', 'Tell us your passion for sports.', '2023-10-12', '2023-10-15', 0);   

   

-- Get the ID of the inserted survey   
DECLARE @SurveyId INT;   
SET @SurveyId = SCOPE_IDENTITY();   

  

-- Insert the first question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'What is your favorite sport?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId1 INT;   
SET @QuestionId1 = SCOPE_IDENTITY();   

  

-- Insert options for the first question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId1, 'Football'),   

       (@QuestionId1, 'Soccer'),   

       (@QuestionId1, 'Cricket'), 

       (@QuestionId1, 'Basketball'), 

       (@QuestionId1, 'Formula 1'), 

       (@QuestionId1, 'Tennis'); 

  

-- Insert the second question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Do you play your favortie sport or watch it?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId2 INT;   
SET @QuestionId2 = SCOPE_IDENTITY();   

  

-- Insert options for the second question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId2, 'Play'),   

       (@QuestionId2, 'Watch'),   

       (@QuestionId2, 'Both'); 

  

-- Insert the third question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Who is your favorite from amongst the following?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId3 INT;   
SET @QuestionId3 = SCOPE_IDENTITY();   

  

-- Insert options for the third question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId3, 'Ronaldo'),   

       (@QuestionId3, 'Messi'),   

       (@QuestionId3, 'Kobe'),
       
       (@QuestionId3, 'LeBron'), 

       (@QuestionId3, 'Nadal'),

       (@QuestionId3, 'Federer'),

       (@QuestionId3, 'Lewis Hamilton'),

       (@QuestionId3, 'Max Verstapen');

  
-- Insert the fourth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'How often do you play any sport?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId4 INT;   
SET @QuestionId4 = SCOPE_IDENTITY();   

  

-- Insert options for the fourth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId4, 'once every few months'),   

       (@QuestionId4, 'one a month'),   

       (@QuestionId4, 'once a week'), 

       (@QuestionId4, 'more than once a week'); 

  

-- Insert the fifth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Are you a memeber of any clubs for sports you play?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId5 INT;   
SET @QuestionId5 = SCOPE_IDENTITY();   

  

-- Insert options for the fifth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId5, 'Yes'),   

       (@QuestionId5, 'No'); 

  

-- Insert the sixth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Have you ever been professionally coached for any sport?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId6 INT;   
SET @QuestionId6 = SCOPE_IDENTITY();   

  

-- Insert options for the sixth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId6, 'Yes'),   
       (@QuestionId6, 'No'); 

  

-- Insert the seventh question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Have you participated in any national/international tournaments');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId7 INT;   
SET @QuestionId7 = SCOPE_IDENTITY();   

  

-- Insert options for the seventh question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId7, 'Yes'),   

       (@QuestionId7, 'No'); 

