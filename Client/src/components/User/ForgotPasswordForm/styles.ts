import styled from "styled-components";
import { shade } from "polished";

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 76vh;

  .Form {
    width: 100%;
    max-width: 350px;
    padding: 20px;
    border-radius: 5px;
    color: rgb(20, 20, 20);
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    > label {
      display: block;

      > input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        border: 0;
        margin-top: 1rem;

        &:focus {
          outline: none;
        }
      }
    }

    > button {
      margin-bottom: 0.7rem;
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      border: 0;
      background-color: ${props => props.theme.colors.primary};
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${props =>shade(0.3, props.theme.colors.primary)};
      }

      &:focus {
        outline: none;
      }
    }
  }

  .Forgot {
    text-align: center;

    &:focus {
      outline: none;
    }

    > a {
      color: #00a8ff;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .Warn {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border: 0;
    background-color: #ff0000;
    color: #fff;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:focus {
      outline: none;
    }
  }

  .Sucess {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border: 0;
    background-color: #00ff00;
    color: #fff;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:focus {
      outline: none;
    }
  }

  .Load {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border: 0;
    background-color: #ff9100;
    color: #fff;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:focus {
      outline: none;
    }
  }

`;