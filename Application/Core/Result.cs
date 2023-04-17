using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace Application.Core
{
    //any for entities and specify generic type T as value
    //T will be swapt with activity
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }

        public string Error { get; set; }


        //result instance type T we either found the value or it be null
        public static Result<T> Success (T value) => new Result<T>{IsSuccess = true, Value = value};
        //
        public static Result<T> Failure(string error) => new Result<T> {IsSuccess = false, Error = error};

    internal static Result<Unit> success(Unit value)
    {
      throw new NotImplementedException();
    }
  }
}
