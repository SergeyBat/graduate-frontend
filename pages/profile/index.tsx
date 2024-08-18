import React, { useEffect, useState } from 'react'; import Layout from 'src/components/shared/Layout';
import bem from 'src/utils/bem';

import actions from '@redux/user/actions/index';
import filesActions from '@redux/files/actions/index';
import CustomInput from '@components/inputs/CustomInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import INPUTS_NAMES from 'src/constants/inputsNames';
import ERRORS from 'src/constants/errors';
import { Button, Modal, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks/hooks';
import { IProfile } from 'src/interfaces';
import RegistrationCompany from 'src/components/elements/RegistrationCompany';
import Portal from 'src/HOC/Portal';
import { connect } from 'react-redux';
import { IStore } from '@redux/interfacesStore';

import companyActions from 'src/redux/company/actions';
import entertainmentsActions from 'src/redux/entertainments/actions';
import EventSmallCard from '@components/cards/EventSmallCard';
import styles from './index.module.scss';

const {
  getCompanyEntertainments,
} = companyActions;
const {
  getEventTypes,
} = entertainmentsActions;

const {
  SHOULD_BE_FILLED,
  INVALID_EMAIL,
  SHORT_PASSWORD,
  ENTER_NAME,
  CONFIRM_PASSWORD_ERROR,
  ENTER_PHONE,
} = ERRORS;

const b = bem('profile', styles);

const schemaProfile = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL).trim().required(SHOULD_BE_FILLED),
  password: Yup.string().min(6, SHORT_PASSWORD).required(SHOULD_BE_FILLED),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], CONFIRM_PASSWORD_ERROR)
    .required(SHOULD_BE_FILLED),
  firstName: Yup.string().required(ENTER_NAME),
  lastName: Yup.string().required(ENTER_NAME),
  phone: Yup.string().min(11, ENTER_PHONE).required(SHOULD_BE_FILLED),
});

const Profile = (props: any) => {
  const {
    companyEntertainments,
    eventTypes,
  } = props;
  const dispatch = useAppDispatch();
  const { user }: { user: IProfile } = useAppSelector((store) => store);
  const [isShowModal, showModal] = useState(false);
  useEffect(() => {
    dispatch(actions.getUserInfo());
  }, [dispatch]);
  const [loadingImage, setLoadingImage] = useState(false);

  const onUploadImage = (data: any) => {
    dispatch(filesActions.uploadImage(
      data,
      (newData: any, fileList: any) => console.log(newData, fileList),
      setLoadingImage,
    ));
  };

  const onChangeProfile = (values: IProfile) => {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
    } = values;
    console.log({
      firstName,
      lastName,
      email,
      password,
      phone,
    });
  };

  return (
    <Layout className={b('')} navColor="scooter">
      <Formik
        initialValues={{ ...user }}
        validationSchema={schemaProfile}
        onSubmit={(values: IProfile) => onChangeProfile(values)}
      >
        {({
          errors,
          handleSubmit,
          touched,
          handleChange,
          values,
        }) => {
          const {
            firstName,
            lastName,
            phone,
            email,
            password,
            confirmPassword,
          }: IProfile = values;
          return (
            <form onSubmit={handleSubmit} name="profile-form">
              <fieldset className={b('fieldset')}>
                {/* <div className={b('column')}> */}
                {/*   <Upload */}
                {/*     name="profile" */}
                {/*     listType="picture-circle" */}
                {/*     className={b('uploader-wrapper')} */}
                {/*     maxCount={1} */}
                {/*     action="" */}
                {/*     onChange={(uploadData) => { */}
                {/*       onUploadImage(uploadData); */}
                {/*     }} */}
                {/*     beforeUpload={() => false} */}
                {/*     showUploadList={{ showPreviewIcon: false }} */}
                {/*   > */}
                {/*     <div className={b('uploader-text-wrapper')}> */}
                {/*       {loadingImage ? <LoadingOutlined /> : <PlusOutlined />} */}
                {/*       <div className={b('uploader-text')}> */}
                {/*         Загрузить */}
                {/*       </div> */}
                {/*     </div> */}
                {/*   </Upload> */}
                {/* </div> */}
                <div className={b('column')}>
                  <div className={b('wrapper-item')}>
                    <div className={b('title')}>Имя</div>
                    <CustomInput
                      className={b('input-wrapper')}
                      inputClass={b('input')}
                      onChange={handleChange}
                      name={INPUTS_NAMES.firstName}
                      value={firstName}
                      isTouched={touched.firstName}
                      error={errors.firstName}
                      isValid={!errors.firstName}
                      withMask={false}
                    />
                  </div>
                  <div className={b('wrapper-item')}>
                    <div className={b('title')}>Фамилия</div>
                    <CustomInput
                      className={b('input-wrapper')}
                      inputClass={b('input')}
                      onChange={handleChange}
                      name={INPUTS_NAMES.lastName}
                      value={lastName}
                      isTouched={touched.lastName}
                      error={errors.lastName}
                      isValid={!errors.lastName}
                      withMask={false}
                    />
                  </div>
                  <div className={b('wrapper-item')}>
                    <div className={b('title')}>Телефон</div>
                    <CustomInput
                      className={b('input-wrapper')}
                      inputClass={b('input')}
                      onChange={handleChange}
                      name={INPUTS_NAMES.phone}
                      value={phone}
                      isTouched={touched.phone}
                      error={errors.phone}
                      isValid={!errors.phone}
                      withMask={false}
                    />
                  </div>
                  <div className={b('wrapper-item')}>
                    <div className={b('title')}>Email</div>
                    <CustomInput
                      className={b('input-wrapper')}
                      inputClass={b('input')}
                      onChange={handleChange}
                      name={INPUTS_NAMES.email}
                      value={email}
                      isTouched={touched.email}
                      error={errors.email}
                      isValid={!errors.email}
                      withMask={false}
                    />
                  </div>
                  <Button
                    className={b('btn')}
                  >
                    Изменить данные
                  </Button>
                </div>
              </fieldset>
            </form>
          );
        }}
      </Formik>
      <Button
        onClick={() => showModal(true)}
      >
        Зарегистрировать свою организацию
      </Button>
      <div className={b('title')}>Мои билеты</div>
      <div className={b('list-wrapper')}>
        {companyEntertainments?.length && companyEntertainments.map((item) => (
          <EventSmallCard event={item} eventTypes={eventTypes} />
        ))}
      </div>
      <Portal>
        <Modal
          className={b('modal-wrapper')}
          title="Регистрация организации"
          open={isShowModal}
          onCancel={() => showModal(false)}
          footer={null}
        >
          <RegistrationCompany />
        </Modal>
      </Portal>
    </Layout>
  );
};

const stateProps = (state: IStore) => ({
  companyEntertainments: state.company.companyEntertainments,
  eventTypes: state.entertainments.eventTypes,
});

const actionsProps = {
  getEventList: getCompanyEntertainments,
  getEventTypesList: getEventTypes,
};

export default connect(stateProps, actionsProps)(Profile);
