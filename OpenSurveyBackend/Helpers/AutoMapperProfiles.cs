using AutoMapper;
using OpenSurveyBackend.Dtos;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Helpers;

public class AutoMapperProfiles: Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<User, UserListDto>();
        CreateMap<Survey, SurveySaveDto>().ReverseMap();
        CreateMap<Survey, SurveyEditDto>().ReverseMap();
        CreateMap<Survey, SurveyListDto>().ReverseMap();
        CreateMap<Question, QuestionSaveDto>().ReverseMap();
        CreateMap<Option, OptionSaveDto>().ReverseMap();
        CreateMap<SurveyResponse, SurveyReportDto>();

        CreateMap<UserGroupRelation, UserGroupDto>().ReverseMap();
        CreateMap<KeyValueSDto, UserGroup>().
            ForMember(d => d.GroupName,
                opt =>
                    opt.MapFrom(src => src.Value)
            );
        CreateMap<UserWithGroups, UserWithUserGroupDto>()
            .ForMember(userGDto => userGDto.User, 
                opt => 
                    opt.MapFrom(src => src.User))
            .ForMember(userGDto => userGDto.UserGroups, 
                opt => 
                    opt.MapFrom(src => src.UserGroups)
            );
    }

}

