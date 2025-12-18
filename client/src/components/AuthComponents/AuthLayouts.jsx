const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
