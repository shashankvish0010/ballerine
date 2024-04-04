import { useFiltersQuery } from '@/domains/filters/hooks/queries/useFiltersQuery/useFiltersQuery';
import { useFilterId } from '@/common/hooks/useFilterId/useFilterId';
import { useCallback, useMemo } from 'react';
import { Home, Building, Goal, Users } from 'lucide-react';
import { TRoutes, TRouteWithChildren } from '@/Router/types';
import { useLocation } from 'react-router-dom';

export const useNavbarLogic = () => {
  const { data: filters } = useFiltersQuery();
  const filterId = useFilterId();
  const individualsFilters = useMemo(
    () => filters?.filter(({ entity }) => entity === 'individuals'),
    [filters],
  );
  const businessesFilters = useMemo(
    () => filters?.filter(({ entity }) => entity === 'businesses'),
    [filters],
  );
  const navItems = [
    {
      text: 'Home',
      icon: <Home size={20} />,
      href: '/en/statistics',
      key: 'nav-item-Home',
    },
    {
      text: 'Businesses',
      icon: <Building size={20} />,
      children:
        businessesFilters?.map(({ id, name }) => ({
          filterId: id,
          text: name,
          href: `/en/case-management/entities?filterId=${id}`,
          key: `nav-item-${id}`,
        })) ?? [],
      key: 'nav-item-businesses',
    },
    {
      text: 'Individuals',
      icon: <Users size={20} />,
      children:
        individualsFilters?.map(({ id, name }) => ({
          filterId: id,
          text: name,
          href: `/en/case-management/entities?filterId=${id}`,
          key: `nav-item-${id}`,
        })) ?? [],
      key: 'nav-item-individuals',
    },
    {
      text: 'Transaction Monitoring',
      icon: <Goal size={20} />,
      children: [
        {
          text: 'Alerts',
          href: `/en/transaction-monitoring/alerts`,
          key: 'nav-item-alerts',
        },
      ],
      key: 'nav-item-transaction-monitoring',
    },
  ] satisfies TRoutes;
  const { pathname } = useLocation();
  const checkIsActiveFilterGroup = useCallback(
    (navItem: TRouteWithChildren) => {
      if (navItem.children) {
        return navItem.children?.some(
          childNavItem => childNavItem.filterId === filterId || childNavItem.href === pathname,
        );
      } else {
        return navItem.href === pathname;
      }
    },
    [filterId, pathname],
  );

  return {
    navItems,
    filterId,
    checkIsActiveFilterGroup,
  };
};
