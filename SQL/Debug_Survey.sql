SELECT TOP (1000) [Id]
      ,[Name]
      ,[Description]
      ,[PublishedOn]
      ,[Deadline]
      ,[Published]
  FROM [openSurvey].[dbo].[Surveys];

SELECT TOP (1000) [Id]
      ,[QuestionText]
      ,[SurveyId]
  FROM [openSurvey].[dbo].[Questions];

SELECT TOP (1000) [Id]
      ,[OptionText]
      ,[QuestionId]
  FROM [openSurvey].[dbo].[Option];


-- DELETE FROM [Option] Where Id > 185
-- DELETE FROM [Questions] Where Id > 60
-- DELETE FROM [Surveys] Where Id > 36