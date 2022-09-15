using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration config)
        
        {
          
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            //use datacontext.cs  from persistence folder
            services.AddDbContext<DataContext>(opt => 
            {
                //connection string source with this we can add the context to the database
                opt.UseSqlite(config.GetConnectionString("DefaultConnection")); 
            });
            //allow any method and header from 3000 otherwise cors will block requests
            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
           services.AddMediatR(typeof(List.Handler).Assembly);
           services.AddAutoMapper(typeof(MappingProfiles).Assembly);

           return services;
        }
    }
}