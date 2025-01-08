'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { generateColor } from '../_libs/generateColor';
import { generateRandomPosition } from '../_libs/generatePosition';
import { TimeCapsule, useTimeCapsuleStore } from '../_libs/zustand';

function TimeCapsuleUi() {
  const { focusedObject, setFocusedObject, setTimeCapsules } = useTimeCapsuleStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TimeCapsule>();

  const handleClickAdd = () => {
    setIsFormOpen(true);
  };

  const onAddSubmit = (data: TimeCapsule) => {
    const newTimeCapsule: TimeCapsule = {
      userId: data.userId,
      title: data.title,
      description: data.description,
      password: data.password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      position: [generateRandomPosition(), generateRandomPosition(), generateRandomPosition()],
      color: generateColor(),
    };
    setTimeCapsules(newTimeCapsule);
    setIsFormOpen(false);
  };

  const onPasswordSubmit = (data: TimeCapsule) => {
    if (data.password === focusedObject?.timeCapsule?.password) {
      setIsPasswordOpen(false);
      setIsModalOpen(true);
    } else {
      setError('password', { message: '비밀번호가 틀렸습니다.' });
    }
  };

  useEffect(() => {
    console.log(focusedObject);
    if (!focusedObject) {
      setIsFormOpen(false);
      setIsPasswordOpen(false);
      setIsModalOpen(false);
      return;
    }
    if (focusedObject?.timeCapsule) {
      setIsPasswordOpen(true);
    }
  }, [focusedObject]);

  return (
    <div className="fixed w-full h-full select-none z-50 pointer-events-none">
      <button
        type="button"
        className="absolute right-0 top-0 bg-neutral-800/50 text-neutral-200 border border-neutral-700 pointer-events-auto p-2 rounded-md hover:bg-neutral-800/70 active:bg-neutral-800/90"
        onClick={handleClickAdd}
      >
        ????
      </button>
      {errors.password?.message && (
        <div className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-neutral-800/50 text-neutral-200 border border-neutral-700 pointer-events-auto p-2 rounded-md hover:bg-neutral-800/70 active:bg-neutral-800/90">
          <div className="flex justify-end">
            <IoClose
              className="cursor-pointer"
              onClick={() => {
                setError('password', { message: '' });
                setFocusedObject(null);
              }}
            />
          </div>
          <p>{errors.password.message}</p>
        </div>
      )}
      {isModalOpen && (
        <div className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-neutral-800/50 text-neutral-200 border border-neutral-700 pointer-events-auto p-2 rounded-md hover:bg-neutral-800/70 active:bg-neutral-800/90">
          <div className="flex justify-end">
            <IoClose
              className="cursor-pointer"
              onClick={() => {
                setIsModalOpen(false);
                setFocusedObject(null);
              }}
            />
          </div>
          <p>{focusedObject?.timeCapsule?.title}</p>
          <p>{focusedObject?.timeCapsule?.description}</p>
        </div>
      )}
      {isPasswordOpen && !errors.password?.message && (
        <form
          onSubmit={handleSubmit(onPasswordSubmit)}
          className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 bg-neutral-800/50 text-neutral-200 border border-neutral-700 pointer-events-auto p-2 rounded-md hover:bg-neutral-800/70 active:bg-neutral-800/90"
        >
          <div className="flex justify-end">
            <IoClose
              className="cursor-pointer"
              onClick={() => {
                setIsPasswordOpen(false);
                setFocusedObject(null);
              }}
            />
          </div>
          <input
            className="bg-neutral-700 text-neutral-200"
            type="password"
            placeholder="비밀번호"
            {...register('password')}
          />
          <button type="submit">확인</button>
        </form>
      )}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit(onAddSubmit)}
          className="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 bg-neutral-800/50 text-neutral-200 border border-neutral-700 pointer-events-auto p-2 rounded-md hover:bg-neutral-800/70 active:bg-neutral-800/90"
        >
          <div className="flex justify-end">
            <IoClose
              className="cursor-pointer"
              onClick={() => {
                setIsFormOpen(false);
                setFocusedObject(null);
              }}
            />
          </div>
          <input
            className="bg-neutral-700 text-neutral-200"
            type="text"
            placeholder="이름"
            {...register('userId')}
          />
          <input
            className="bg-neutral-700 text-neutral-200"
            type="text"
            placeholder="제목"
            {...register('title')}
          />
          <textarea
            className="bg-neutral-700 text-neutral-200"
            placeholder="내용"
            {...register('description')}
          />
          <input
            className="bg-neutral-700 text-neutral-200"
            type="password"
            placeholder="비밀번호"
            {...register('password')}
          />
          <button type="submit">보관</button>
        </form>
      )}
    </div>
  );
}

export default TimeCapsuleUi;
