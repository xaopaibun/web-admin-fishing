import styled from 'styled-components';

type Props = {};

export default styled.section<Props>`
  .container {
    .form-search {
      width: 100%;
      display: flex;
      align-items: center;
      .ant-form {
        width: 100%;
        display: flex;
        align-items: center;
      }
      .item {
        width: 40%;
        margin-right: 20px;
      }
      .label-reset {
        font-size: 14px;
        cursor: pointer;
        text-decoration-line: underline;
        color: #00a3a5;
      }
      .btn-search {
        background: #ffffff;
        border: 1px solid #00a3a5;
        box-shadow: 1px 1px 4px rgba(68, 68, 68, 0.2);
        border-radius: 5px;
        margin-right: 10px;
        font-size: 14px;
        color: #00a3a5;
        cursor: pointer;
        .icon-search {
          font-size: 18px;
          margin-right: 3px;
        }
      }
    }
    padding: 30px;
    .mr-50 {
      height: 50px;
    }
    .text-label {
      font-size: 13px;
      color: #777777;
    }
  }
`;
