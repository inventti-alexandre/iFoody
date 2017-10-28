﻿using Resolver;
using System;
using System.ComponentModel;
using System.ComponentModel.Composition;

namespace DataModel
{
    [Export(typeof(IComponent))]
    public class DependencyResolver : IComponent
    {
        public void SetUp(IRegisterComponent registerComponent)
        {
            // Mew Mew... Add new Dependency Resolver below 
            registerComponent.RegisterType<IUnitOfWork.IUnitOfWork, UnitOfWork.UnitOfWork>();

        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public ISite Site { get; set; }
        public event EventHandler Disposed;
    }
}
