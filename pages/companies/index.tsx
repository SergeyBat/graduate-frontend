import React, { useEffect } from 'react';
import Layout from 'src/components/shared/Layout';
import bem from 'src/utils/bem';
import CompanyCard from '@components/cards/CompanyCard';
import actions from 'src/redux/company/actions/index';
import { connect } from 'react-redux';
import styles from './index.module.scss';

const b = bem('entertainments', styles);

const Companies = (props: any) => {
  const {
    companiesList,
    getAllCompaniesInfo,
  } = props;

  useEffect(() => {
    const filters = {
      'filters[isDeleted]': false,
      'filters[approved]': true,
    };
    getAllCompaniesInfo(filters);
  }, []);

  return (
    <Layout className={b('')} navColor="scooter">
      <div className={b('list-wrapper')}>
        {Boolean(companiesList?.length) && companiesList.map((item: any) => (
          <CompanyCard
            key={item.id}
            company={item}
          />
        ))}
      </div>
    </Layout>
  );
};
const mapStateToProps = ({
  company,
}: any) => ({
  ...company,
});

export default connect(mapStateToProps, actions)(Companies);
