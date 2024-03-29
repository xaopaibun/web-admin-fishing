import styled from 'styled-components';

type Props = {};

export default styled.section<Props>`
  padding: 30px;
  margin-bottom: 100px;
  .text-label {
    font-size: 13px;
    color: #424242;
  }
  .require {
    font-family: 'Lato';
    font-size: 20px;
    color: #f0330a;
  }
  .form-input {
    .text-input {
      font-size: 14px;
    }
    .input_small {
      width: 120px;
    }
    .input-month-day {
      width: 80px;
    }
    .text-label-content {
      font-size: 12px;
      color: #777777;
      margin: 0 10px 0 7px;
    }
  }
  .card {
    margin: 20px 0;
  }
  .button-label {
    color: #5244e5;
    cursor: pointer;
  }
  .list-image {
    display: flex;
    flex-wrap: wrap;
    .image,
    .ant-upload-picture-card-wrapper {
      width: 105px;
      height: 105px;
      margin-right: 10px;
    }
  }
  .btn-add {
    padding: 10px 16px;
    border: 1px solid #5244e5;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wrap-submit {
    height: 95px;
    width: calc(100% - 240px);
    transition: width 0.3s;
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.06);
    .wrap-button {
      margin: auto;
      z-index: 9;
      .btn {
        padding: 0 15px;
        height: 40px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 700;
        margin-left: 10px;
      }
      .btn-active,
      .btn_submit {
        background-color: #f6ac00;
        border: 1px solid #f6ac00;
        box-shadow: 1px 1px 4px rgba(68, 68, 68, 0.2);
        border-radius: 5px;
        color: #ffffff;
        a {
          color: unset;
          &:hover {
            color: unset;
          }
        }
        .icon {
          font-size: 18px;
        }
      }
    }
  }
  .array .ant-form-item-control-input-content {
    display: flex;
  }
  .btn-remove {
    height: 42px;
  }
`;
