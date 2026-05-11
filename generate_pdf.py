from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)

OUTPUT = "entrega.pdf"

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=3 * cm,
    rightMargin=2 * cm,
    topMargin=3 * cm,
    bottomMargin=2 * cm,
)

INDIGO = HexColor("#4f46e5")
DARK = HexColor("#1e293b")
GRAY = HexColor("#64748b")
LIGHT_BG = HexColor("#f1f5f9")
WHITE = HexColor("#ffffff")

style_title = ParagraphStyle(
    "Title",
    fontName="Times-Bold",
    fontSize=16,
    leading=24,
    alignment=TA_CENTER,
    spaceAfter=6,
    textColor=DARK,
)

style_subtitle = ParagraphStyle(
    "Subtitle",
    fontName="Times-Roman",
    fontSize=13,
    leading=20,
    alignment=TA_CENTER,
    spaceAfter=6,
    textColor=GRAY,
)

style_author = ParagraphStyle(
    "Author",
    fontName="Times-Bold",
    fontSize=12,
    leading=18,
    alignment=TA_CENTER,
    textColor=DARK,
)

style_date = ParagraphStyle(
    "Date",
    fontName="Times-Roman",
    fontSize=11,
    leading=16,
    alignment=TA_CENTER,
    textColor=GRAY,
)

style_heading = ParagraphStyle(
    "Heading",
    fontName="Times-Bold",
    fontSize=13,
    leading=20,
    spaceBefore=18,
    spaceAfter=8,
    textColor=DARK,
)

style_body = ParagraphStyle(
    "Body",
    fontName="Times-Roman",
    fontSize=12,
    leading=18,
    alignment=TA_JUSTIFY,
    spaceAfter=6,
    textColor=DARK,
)

style_link_label = ParagraphStyle(
    "LinkLabel",
    fontName="Times-Bold",
    fontSize=11,
    leading=16,
    textColor=DARK,
)

style_link_url = ParagraphStyle(
    "LinkURL",
    fontName="Times-Roman",
    fontSize=10,
    leading=15,
    textColor=INDIGO,
)

story = []

story.append(Spacer(1, 2 * cm))
story.append(Paragraph("TODO List &mdash; SPEC-DRIVEN Development", style_title))
story.append(Spacer(1, 0.3 * cm))
story.append(Paragraph("Entrega de Links do Projeto", style_subtitle))
story.append(Spacer(1, 1.5 * cm))
story.append(HRFlowable(width="40%", thickness=1, color=INDIGO, spaceAfter=20))
story.append(Paragraph("Gustavo Laube Schwartz", style_author))
story.append(Spacer(1, 0.4 * cm))
story.append(Paragraph("Maio de 2026", style_date))
story.append(Spacer(1, 3 * cm))

story.append(Paragraph("1. Links do Projeto", style_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LIGHT_BG, spaceAfter=12))

links = [
    (
        "Repositório GitHub",
        "https://github.com/GustavoLaubeSchwartz/TO-DO-LIST-SPEC-DRIVEN",
        "Código-fonte completo do projeto, incluindo artefatos SPEC-DRIVEN.",
    ),
    (
        "Aplicação em Produção (Render)",
        "https://to-do-list-spec-driven.onrender.com",
        "TODO List funcional hospedado gratuitamente no Render.",
    ),
    (
        "Documentação Online (GitHub Pages)",
        "https://gustavolaubeschwartz.github.io/TO-DO-LIST-SPEC-DRIVEN/",
        "Documentação completa gerada com MkDocs + Material theme.",
    ),
]

for label, url, desc in links:
    story.append(Spacer(1, 0.3 * cm))

    table_data = [
        [
            Paragraph(f"<b>{label}</b>", style_link_label),
        ],
        [
            Paragraph(
                f'<a href="{url}" color="#4f46e5">{url}</a>',
                style_link_url,
            ),
        ],
        [
            Paragraph(desc, style_body),
        ],
    ]

    t = Table(table_data, colWidths=[doc.width])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), LIGHT_BG),
                ("BACKGROUND", (0, 1), (-1, -1), WHITE),
                ("BOX", (0, 0), (-1, -1), 0.5, HexColor("#e2e8f0")),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    story.append(t)

story.append(Spacer(1, 1.5 * cm))
story.append(Paragraph("2. Informações Adicionais", style_heading))
story.append(HRFlowable(width="100%", thickness=0.5, color=LIGHT_BG, spaceAfter=12))

story.append(
    Paragraph(
        "Este projeto foi desenvolvido seguindo a metodologia <b>SPEC-DRIVEN Development</b> "
        "utilizando o toolkit <i>spec-kit</i> do GitHub. A arquitetura adotada é <b>MVC "
        "(Model-View-Controller)</b> em estrutura <b>mono-repo</b>, com armazenamento "
        "exclusivamente em memória (sem banco de dados persistente).",
        style_body,
    )
)

story.append(Spacer(1, 0.3 * cm))

story.append(
    Paragraph(
        "A aplicação permite cadastrar tarefas, remover tarefas e configurar "
        "lembretes com notificação visual automática. Todas as justificativas "
        "das escolhas arquiteturais e tecnológicas estão documentadas na "
        "<b>Constitution</b> do projeto e na página de <b>Justificativas</b> da "
        "documentação online.",
        style_body,
    )
)

story.append(Spacer(1, 0.5 * cm))

info_data = [
    ["Stack", "Node.js + Express / HTML-CSS-JS vanilla"],
    ["Arquitetura", "MVC (Model-View-Controller)"],
    ["Armazenamento", "Em memória (sem banco de dados)"],
    ["Deploy Backend", "Render (tier gratuito)"],
    ["Deploy Docs", "GitHub Pages + MkDocs"],
    ["Metodologia", "SPEC-DRIVEN Development (spec-kit)"],
]

info_table_data = [[Paragraph(f"<b>{k}</b>", style_link_label), Paragraph(v, style_body)] for k, v in info_data]

t2 = Table(info_table_data, colWidths=[4.5 * cm, doc.width - 4.5 * cm])
t2.setStyle(
    TableStyle(
        [
            ("BACKGROUND", (0, 0), (0, -1), LIGHT_BG),
            ("BOX", (0, 0), (-1, -1), 0.5, HexColor("#e2e8f0")),
            ("INNERGRID", (0, 0), (-1, -1), 0.3, HexColor("#e2e8f0")),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ]
    )
)
story.append(t2)

doc.build(story)
print(f"PDF gerado: {OUTPUT}")
