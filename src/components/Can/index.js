import {useSelector} from 'react-redux';

function checkAuth({roles, permissions}, checkRole, checkPermission) {
  if (checkRole && !roles.includes(checkRole)) {
    return false;
  }
  if (checkPermission && !permissions.includes(checkPermission)) {
    return false;
  }
  return true;
}

function Can({children, checkRole, checkPermission}) {
  const auth = useSelector((state) => state.auth);

  if (typeof children === 'function') {
    return children(checkAuth(auth, checkRole, checkPermission));
  }
  if (checkAuth(auth, checkRole, checkPermission)) {
    return children;
  }
  return null;
}

export default Can;
