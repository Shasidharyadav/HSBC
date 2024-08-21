import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }

  body {
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1, h2 {
    color: #333;
  }

  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  button:hover {
    background-color: #45a049;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  select, input[type="text"], input[type="password"] {
    padding: 10px;
    margin: 10px;
    font-size: 1em;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .dashboard {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .filters {
    margin-bottom: 20px;
  }

  .chart-container {
    margin: 20px auto;
    width: 50%;
    height: 300px;
  }

  ul {
    list-style: none;
  }

  li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
`;

export default GlobalStyles;
