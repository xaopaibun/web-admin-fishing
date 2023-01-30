import { FC } from 'react';
import { useAppDispatch } from 'hooks';
import { signIn } from 'containers/Auth/thunk';
import { SignInReq } from 'types';
import 'bulma/css/bulma.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { generatePath, useNavigate } from 'react-router-dom';
import { routes } from 'navigations/routes';
import SectionStyled from './styles';
const Login: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: 'quypv@mor.com.vn',
      password: 'a12345678',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email().max(300),
      password: Yup.string().required().max(30),
    }),
    onSubmit: async (values: SignInReq) => {
      dispatch(signIn(values));
      const resultAction = await dispatch(signIn(values));
      if (signIn.fulfilled.match(resultAction)) {
        navigate(generatePath(routes.Dashboard.path, { entity: 'receiving' }));
      }
    },
  });

  const { errors, handleSubmit, handleChange, values } = formik;

  return (
    <SectionStyled>
      <div className="section is-fullheight">
        <div className="container">
          <div className="column is-6 is-offset-3">
            <div className="box">
              <h1 style={{ fontSize: 40, textAlign: 'center' }}>Login</h1>
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label className="label">Email Address</label>
                  <div className="control">
                    <input
                      autoComplete="off"
                      className={`input ${errors.email && 'is-danger'}`}
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email || ''}
                      required
                    />
                    {errors.email && <p className="help is-danger">{errors.email}</p>}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className={`input ${errors.password && 'is-danger'}`}
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password || ''}
                      required
                    />
                  </div>
                  {errors.password && <p className="help is-danger">{errors.password}</p>}
                </div>
                <button type="submit" className="button is-block is-info is-fullwidth">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SectionStyled>
  );
};

export default Login;
