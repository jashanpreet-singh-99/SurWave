using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.VisualBasic;
using WebAPI.Middlewares;

namespace WebAPI.Extensions
{
    public static class ExceptionMiddlewareExtension
    {
        public static void ConfigureExceptionHandler(WebApplication app) {

            app.UseMiddleware<ExceptionMiddleware>();
        }



        public static void ConfigureBuilinExceptionHandler(WebApplication app) {
            if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    //in the caluse below the middle ware handles all the thrown exceptions and we do not need to make out
    // own try catch bloxk everywhere an error is possible
} else {
    app.UseExceptionHandler(
        options => {
            options.Run(
                async context => {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var ex = context.Features.Get<IExceptionHandlerFeature>();
                if(ex != null) {
                    await context.Response.WriteAsync(ex.Error.Message);
                }
                }
            );
        } 
    );
}


        }
    }
}