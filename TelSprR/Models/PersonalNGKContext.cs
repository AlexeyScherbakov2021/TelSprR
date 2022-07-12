using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TelSprR.Models;

namespace TelSprR.Models
{
    public partial class PersonalNGKContext : DbContext
    {
        public PersonalNGKContext()
        {
        }

        public PersonalNGKContext(DbContextOptions<PersonalNGKContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Otdel> Otdel { get; set; }
        public virtual DbSet<Personal> Personal { get; set; }
        public virtual DbSet<Prof> Prof { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=localhost\\SQLEXPRESS;Database=PersonalNGK;Trusted_Connection=True;");
            }

            //optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Otdel>(entity =>
            {
                entity.Property(e => e.OtdelName)
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.HasOne(d => d.OtdelParent)
                    .WithMany(p => p.SubOtdel)
                    .HasForeignKey(d => d.OtdelParentId)
                    .HasConstraintName("FK_Otdel_Otdel");
            });

            modelBuilder.Entity<Personal>(entity =>
            {
                entity.Property(e => e.PersonalEmail)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PersonalLastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PersonalMidName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PersonalMobil)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.PersonalName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PersonalPhoto).IsUnicode(false);

                entity.Property(e => e.PersonalTel)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PersonalUserName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.PersonalProf)
                    .WithMany(p => p.Personal)
                    .HasForeignKey(d => d.PersonalProfId)
                    .HasConstraintName("FK_Personal_Personal");
            });

            modelBuilder.Entity<Prof>(entity =>
            {
                entity.Property(e => e.ProfName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ProfOrder).HasDefaultValueSql("((500))");
            });
        }
    }
}
