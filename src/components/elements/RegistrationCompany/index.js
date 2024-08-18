import { Formik } from 'formik';
import { Button, Upload } from 'antd';
import React, { useEffect } from 'react';
import CustomTextarea from 'src/components/inputs/CustomTextarea';
import { LOCALHOST_MINIO_IMAGES } from 'src/constants';
import CustomInput from 'src/components/inputs/CustomInput';
import bem from 'src/utils/bem';
import { connect } from 'react-redux';
import constants from './constants';
import actions from '../../../redux/company/actions';
import filesActions from '../../../redux/files/actions';
import styles from './index.module.scss';

const b = bem('modal-registration-company', styles);

const {
  INPUTS_NAMES,
  NAME,
  DESCRIPTION,
  CITY,
  ADDRESS,

} = constants;

const RegistrationCompany = (props) => {
  const {
    uploadImage,
    createCompany,
    getMyCompany,
    selectedCompany,
  } = props;
  console.log('=>(index.js:31) selectedCompany', selectedCompany);

  useEffect(() => {
    getMyCompany();
  }, []);

  const onUploadImage = (data, setFieldValue) => {
    uploadImage(
      data,
      (imageKey) => setFieldValue('imageKey', imageKey),
      () => {},
    );
  };

  const onSubmit = (values) => {
    console.log(values);
    // createCompany(values)
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => onSubmit(values)}
    >
      {({
        errors,
        handleSubmit,
        touched,
        handleChange,
        values,
        setFieldValue,
      }) => {
        const {
          name,
          description,
          city,
          address,
          imageKey,
        } = values;
        return (
          <form
            className={b('form-wrapper')}
            onSubmit={handleSubmit}
            name="organization"
          >
            <div className={b('main-info')}>
              <div className={b('row-wrapper')}>
                <div className={b('input-wrapper-column')}>
                  <div className={b('input-title')}>{NAME}</div>
                  <CustomInput
                    className={b('input-wrapper')}
                    inputClass={b('input')}
                    onChange={handleChange}
                    name={INPUTS_NAMES.name}
                    placeholder={NAME}
                    value={name}
                    isTouched={touched.name}
                    error={errors.name}
                    isValid={!errors.name}
                    withMask={false}
                  />
                  <div className={b('input-title')}>{DESCRIPTION}</div>
                  <CustomTextarea
                    className={b('textarea-wrapper')}
                    inputClass={b('input')}
                    onChange={handleChange}
                    name={INPUTS_NAMES.description}
                    placeholder={DESCRIPTION}
                    value={description}
                    isValid={!errors.description}
                  />
                </div>
              </div>
              <div className={b('input-wrapper-column')}>
                <div className={b('input-wrapper-column')}>
                  <div className={b('input-title')}>{CITY}</div>
                  <CustomInput
                    className={b('input-wrapper')}
                    inputClass={b('input')}
                    onChange={handleChange}
                    name={INPUTS_NAMES.city}
                    placeholder={CITY}
                    value={city}
                    withMask={false}
                  />
                </div>
                <div className={b('input-wrapper-column')}>
                  <div className={b('input-title')}>{ADDRESS}</div>
                  <CustomInput
                    className={b('input-wrapper')}
                    inputClass={b('input')}
                    onChange={handleChange}
                    name={INPUTS_NAMES.address}
                    placeholder={ADDRESS}
                    value={address}
                    withMask={false}
                  />
                </div>
              </div>
              <Upload
                name="profile"
                className={b('uploader-wrapper')}
                maxCount={1}
                action=""
                onChange={(uploadData) => {
                  onUploadImage(uploadData, setFieldValue);
                }}
                beforeUpload={() => false}
                showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
              >
                <div className={b('uploader-image-wrapper')}>
                  {imageKey ? (
                    <img
                      className={b('uploading-image')}
                      src={LOCALHOST_MINIO_IMAGES + imageKey}
                      alt="main"
                    />
                  ) : <span>Загрузите изображение</span>}
                  <div className={b('uploader-text')}>
                    Загрузить
                  </div>
                </div>
              </Upload>
            </div>
            <div className={b('actions-form-wrap')}>
              <Button className={b('btn')}>
                Зарегистрировать
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = ({ company }) => ({ ...company });

export default connect(
  mapStateToProps,
  {
    ...actions,
    ...filesActions,
  },
)(RegistrationCompany);
