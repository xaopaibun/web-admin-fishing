import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Select, SubmitButton } from 'formik-antd';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'hooks';
import HeaderDashboard from 'components/Header';
import { loadingRef } from 'components/Loading';
import { Button, Card, Image, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { PayloadCreateProduct } from 'types';
import { routes } from 'navigations/routes';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { dashboardSelector } from '../selectors';
import { getDetailProductThunk, getListCategoryThunk, updateProductThunk } from '../thunk';
import CreateProductStyled from './styles';

const Update: FC = () => {
  const dispatch = useAppDispatch();
  const { listCategory, loading, product } = useSelector(dashboardSelector);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getDetailProductThunk(id));
      dispatch(getListCategoryThunk({ limit: 10, page: 1 }));
    }
  }, [dispatch, id]);

  const { Option } = Select;

  const handleResetForm = () => formik.resetForm();

  const navigate = useNavigate();

  const { TextArea } = Input;

  useEffect(() => {
    formik.setFieldValue('name', product.name);
    formik.setFieldValue('category_id', product.category_id);
    formik.setFieldValue('image', product.image);
    formik.setFieldValue('slug', product.slug);
    formik.setFieldValue('content', product.content);
    formik.setFieldValue('height', product.height);
    formik.setFieldValue('weight', product.weight);
    formik.setFieldValue('width', product.width);
    formik.setFieldValue('length', product.length);
    formik.setFieldValue('variant', product.variant);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const formik = useFormik<PayloadCreateProduct>({
    initialValues: {
      name: '',
      slug: '',
      category_id: '',
      image: [] as Array<File | string>,
      content: '',
      height: 0,
      weight: 0,
      width: 0,
      length: 0,
      variant: [
        {
          name: '',
          option: [],
        },
      ],
    },
    onSubmit: async (values) => {
      // const { name, category_id, image, price, content, slug, star, information, stock } = values;
      // const formData = new FormData();
      // formData.append('name', name);
      // formData.append('category_id', category_id);
      // formData.append('image', new Blob([image as BlobPart]));
      // formData.append('price', price.toString());
      // formData.append('content', content);
      // formData.append('slug', slug);
      // formData.append('star', star.toString());
      // formData.append('information', information);
      // formData.append('stock', stock.toString());
      const resultAction = await dispatch(updateProductThunk({ id: id!, body: values as unknown }));
      if (updateProductThunk.fulfilled.match(resultAction)) {
        navigate(generatePath(routes.Dashboard.path, { entity: 'receiving' }));
      }
    },
  });

  useEffect(() => {
    loadingRef.current?.isLoading(loading);
  }, [loading]);

  return (
    <>
      <HeaderDashboard title="Cập nhật thông tin sản phẩm" className="header" />
      <CreateProductStyled>
        <FormikProvider value={formik}>
          <Form layout="vertical" autoComplete="off">
            <Card title="Thông tin cơ bản" className="card">
              <Form.Item
                name="name"
                label={
                  <span className="text-label">
                    Tên sản phẩm <span className="require">*</span>
                  </span>
                }
                className="form-input"
              >
                <Input name="name" className="text-input" placeholder="Nhập tên sản phẩm" />
              </Form.Item>
              <Form.Item
                name="category_id"
                label={
                  <span className="text-label">
                    Loại sản phẩm
                    <span className="require" />
                  </span>
                }
                className="form-input"
              >
                <Select name="category_id" placeholder="Chọn loại sản phẩm" allowClear>
                  {listCategory.length &&
                    listCategory.map((item, index) => (
                      <Option key={index} value={item._id}>
                        {item.category_name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Card>
            {/* <Upload
              name="image"
              accept=".jpeg, .png"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={(value: UploadChangeParam<UploadFile<File>>) =>
                formik.setFieldValue('image', value.file)
              }
            >
              <Button icon={<UploadOutlined />}>Upload ảnh</Button>
            </Upload>
            {formik.values.image && (
              <Image
                src={
                  typeof formik.values.image === 'string'
                    ? formik.values.image
                    : URL.createObjectURL(new Blob([formik.values.image as unknown as BlobPart]))
                }
                alt="image"
                width={250}
                style={{ marginRight: 5 }}
                className="image"
              />
            )} */}
            <Card title="Thông tin chi tiết" className="card">
              <p>Hình ảnh sản phẩm </p>
              <p>Khuyến nghị: Tải lên ít nhất 3 hình ảnh để giúp người mua tìm hiểu thêm</p>
              <div className="list-image">
                {formik.values.image &&
                  formik.values.image.map((item) => (
                    <Image
                      src={(item as string) || URL.createObjectURL(new Blob([item as BlobPart]))}
                      alt="image"
                      width={105}
                      style={{ marginRight: 10 }}
                      className="image"
                    />
                  ))}
                <Upload
                  name="image"
                  accept=".jpeg, .png"
                  multiple
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={(value: UploadChangeParam<UploadFile<File>>) => {
                    formik.setFieldValue(
                      'image',
                      value.fileList.map((item) => item.originFileObj)
                    );
                  }}
                >
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </div>
              <Form.Item
                name="slug"
                label={
                  <span className="text-label">
                    Nhập slug <span className="require">*</span>
                  </span>
                }
                className="form-input"
              >
                <Input name="slug" className="text-input" placeholder="Nhập slug" />
              </Form.Item>
              <Form.Item name="content" label="Nhập nội dung" className="form-input">
                <TextArea
                  rows={8}
                  name="content"
                  className="text-input"
                  placeholder="Nhập mô tả sản phẩm"
                />
              </Form.Item>
            </Card>
            <Card title="Thông tin bán hàng" className="card">
              <FieldArray
                name="variant"
                render={(arrayHelpers) => (
                  <div>
                    {formik.values.variant?.map((_item, index) => (
                      <div key={index}>
                        <Form.Item
                          name={`variant[${index}].name`}
                          label="Nhập tên biến thể "
                          className="form-input"
                        >
                          <Input
                            name={`variant[${index}].name`}
                            className="text-input"
                            placeholder="Nhập variant"
                          />
                        </Form.Item>
                        <FieldArray
                          name={`variant[${index}].option`}
                          render={(arrayHelpers_option) => (
                            <div>
                              {formik.values.variant[index].option.map((option, i) => (
                                <div key={index} className="array">
                                  <Form.Item
                                    name={`variant[${index}].option[${i}].value`}
                                    label="Tùy chọn"
                                    className="form-input"
                                  >
                                    <Input
                                      name={`variant[${index}].option[${i}].value`}
                                      className="text-input"
                                      placeholder="Nhập một tùy chọn"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    name={`variant[${index}].option[${i}].price`}
                                    label={`Nhập gía ${option.value}: `}
                                    className="form-input"
                                  >
                                    <Input
                                      name={`variant[${index}].option[${i}].price`}
                                      className="text-input"
                                      placeholder="Nhập một tùy chọn"
                                    />
                                    <Button
                                      className="btn btn-remove"
                                      onClick={() => arrayHelpers_option.remove(index)}
                                    >
                                      -
                                    </Button>
                                  </Form.Item>
                                </div>
                              ))}
                              <p
                                className="button-label"
                                onClick={() =>
                                  arrayHelpers_option.push({ price: 0, value: '', inventory: true })
                                }
                              >
                                + Thêm một tuỳ chọn
                              </p>
                            </div>
                          )}
                        />
                        {/* <Button
                          className="btn btn-submit"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </Button> */}
                        {/* <Button
                          className="btn-add"
                          onClick={() =>
                            arrayHelpers.push({
                              name: '',
                              option: [],
                            })
                          }
                        >
                          <span className="button-label">+ Thêm biến thể</span>
                        </Button> */}
                      </div>
                    ))}
                  </div>
                )}
              />
            </Card>
            <Card title="Vận chuyển & Bảo hành" className="card">
              <Form.Item name="weight" label="Trọng lượng Sản phẩm (gram): " className="form-input">
                <Input
                  name="weight"
                  className="text-input"
                  placeholder="Nhập trọng lượng Sản phẩm (gram)"
                />
              </Form.Item>
              <p>Kích thước Sản phẩm</p>
              <div style={{ display: 'flex' }}>
                <div>
                  <label>Chiều cao (cm)</label>
                  <Input name="height" className="text-input" placeholder="Chiều cao (cm)" />
                </div>
                <div>
                  <label>Chiều rộng (cm)</label>
                  <Input name="width" className="text-input" placeholder="Chiều rộng (cm)" />
                </div>
                <div>
                  <label>Chiều dài (cm)</label>
                  <Input name="length" className="text-input" placeholder="Chiều dài (cm)" />
                </div>
              </div>
            </Card>
            <div className="wrap-submit">
              <div className="wrap-button">
                <SubmitButton className="btn btn_submit">Cập nhật</SubmitButton>
                <button className="btn btn_close" type="button" onClick={handleResetForm}>
                  Huỷ bỏ
                </button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </CreateProductStyled>
    </>
  );
};

export default Update;
