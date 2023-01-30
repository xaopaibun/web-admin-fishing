import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @font-face {
    font-family: Poppins;
    src: url(/assets/fonts/SVN-Poppins-Regular.otf);
  }
  *{
    font-family:Helvetica;
  }
  @media screen and (min-width: 1408px) {
    .container:not(.is-max-desktop):not(.is-max-widescreen) {
      max-width: unset;
    }
  }
  @media screen and (min-width: 1216px) {
    .container:not(.is-max-desktop) {
      max-width: unset;
    }
  }
  @media screen and (min-width: 1024px) {
    .container {
      max-width: unset;
    }
  }
  .table{
    background-color: unset;
  }
  .text-input{
    padding: 10px 12px;
    &:hover, &:focus{
      border-color: #5244e5;
      box-shadow: unset;
    }
  }
  .ant-input-affix-wrapper-readonly {
      background: #f9f8f8;
      border-color: #eaeaea;
      color: #2a2a2a;
      &:hover {
        border-color: #eaeaea;
      }
      &.ant-input-affix-wrapper-focused {
        box-shadow: none;
      }
      .ant-input {
        background-color: transparent;
      }
    }
`;
