import styled from 'styled-components';

const Card = styled.div`
  box-sizing: border-box;
  max-width: 410px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 1em;
  border: 1px solid #999;
  margin: 1em;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background-color: rgba(255, 111, 1, 1);
  border-color: rgba(230, 163, 21, 1);
  border-radius: 5px;
  padding: 1em;
  color: white;
  font-weight: 700;
  margin: 1em;
  font-size: 0.8rem;
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 1rem;
`;

const Error = styled.div`
  background-color: rgba(197, 0, 0, 1);
  color: #fff;
  margin: 1em;
  padding: 1em;
`;

export { Form, Input, Button, Logo, Card, Error };