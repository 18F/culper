FROM voidlinux/voidlinux

RUN xbps-install -Syu make pkg-config gd-devel graphviz gcc git wget cpanminus postgresql postgresql-client go nodejs font-hack-ttf;
RUN cpanm ExtUtils::PkgConfig GD GraphViz SQL::Translator;
