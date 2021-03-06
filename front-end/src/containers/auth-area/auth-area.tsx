import { logIn, closeLoginModal, openLoginModal, logout } from 'store';
import { connect } from 'react-redux';
import { GenericState } from 'store';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { LoginModel } from 'models';
import { Modal, Button, Box } from '@material-ui/core';
import './authArea.scss';

interface PropsFromDispatch {
   onOpen: typeof openLoginModal;
   onClose: typeof closeLoginModal;
   onLogin: Function;
   onLogOut: typeof logout;
}

interface PropsFromState {
   errorMessage: string;
   isOpen: boolean;
   isAuthorized: boolean;
}

type Props = PropsFromState & PropsFromDispatch;

const AuthArea: React.FC<Props> = (props: Props) => {
   const {
      onLogin,
      errorMessage,
      isOpen,
      onClose,
      onOpen,
      isAuthorized,
      onLogOut,
   } = props;
   const [loginFormState, hanldeChange] = useState<LoginModel>(() => ({
      userName: '',
      password: '',
   }));

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      hanldeChange({ ...loginFormState, [name]: value });
   };

   const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onLogin(loginFormState);
   };

   const isError: boolean = errorMessage.length! ? true : false;

   return (
      <>
         <Button
            variant='contained'
            color='secondary'
            onClick={() => {
               isAuthorized ? onLogOut() : onOpen();
            }}
         >
            {isAuthorized ? 'LogOut' : 'LogIn'}
         </Button>
         <Modal
            open={isOpen}
            onClose={() => {
               onClose();
            }}
         >
            <form className='modalForm loginForm' onSubmit={onFormSubmit}>
               {isError ? (
                  <span className='warningMassange'>{errorMessage}</span>
               ) : null}
               <input
                  placeholder='UserName...'
                  name='userName'
                  required
                  value={loginFormState.userName}
                  onChange={handleInputChange}
               />
               <input
                  placeholder='Password...'
                  name='password'
                  required
                  value={loginFormState.password}
                  type='password'
                  onChange={handleInputChange}
               />
               <button>Sign In</button>
            </form>
         </Modal>
      </>
   );
};

const mapStateToProps = (state: GenericState) => ({
   errorMessage: state.auth.errorMessage,
   isOpen: state.auth.isModalOpen,
   isAuthorized: state.auth.userName.length !== 0,
});

const mapDispathToProps = {
   onOpen: openLoginModal,
   onClose: closeLoginModal,
   onLogin: logIn,
   onLogOut: logout,
};

export default connect(
   mapStateToProps,
   mapDispathToProps,
)(AuthArea);
